from sqlalchemy import create_engine, ForeignKey, Column, Integer, String, MetaData, Table, LargeBinary, update
from sqlalchemy.ext.declarative import declarative_base

import sys
import json


meta = MetaData()

Characters = Table(
    'characters', meta,
    Column('id', Integer, primary_key = True),
    Column('user_id', Integer),
    Column('name', String),
    Column('savedata', LargeBinary),
)

Users = Table(
    'users', meta,
    Column('id', Integer, primary_key = True),
    Column('username', String),
)


def getBackupData(filename=None):
    with open(filename, "rb") as fh:
        return fh.read()


def getConnectionString(erupeConfigFilename="config.json"):
    # Load database settings from Erupe config
    with open(erupeConfigFilename) as fh:
        configData = json.loads(fh.read())

    databaseUser = configData["database"]["user"]
    databasePassword = configData["database"]["password"]
    databaseHost = configData["database"]["host"]
    databasePort = configData["database"]["port"]
    databaseDatabase = configData["database"]["database"]

    connection_string = f"postgresql://{databaseUser}:{databasePassword}@{databaseHost}:{databasePort}/{databaseDatabase}"

    return connection_string


def updateSaveData(connection, id, data):
    updateCommand = update(Characters).where(Characters.c.id == id).values(savedata=data)

    connection.execute(updateCommand)


def getUserRowForCharacter(connection, character):
    for user in connection.execute(Users.select(Users.c.id == character.user_id)):
        return user


def printCharactersInfo(connection):
    for character in connection.execute(Characters.select()):
        user = getUserRowForCharacter(connection, character)

        print(f"Id: {character.id} - User: {user.username} - Character: {character.name}")


def main():
    characterId = sys.argv[1] if len(sys.argv) >= 2 else None
    backupFilename = sys.argv[2] if len(sys.argv) >= 3 else None

    connectionString = getConnectionString()
    engine = create_engine(connectionString)
    connection = engine.connect()

    if characterId == "--list":
        printCharactersInfo(connection)

        return

    if characterId is None:
        print("-- Character list --")
        printCharactersInfo(connection)

        characterId = input("Character Id: ")

    if backupFilename is None:
        backupFilename = input("Backup filename: ")

    backupData = getBackupData(backupFilename)

    updateSaveData(connection, characterId, backupData)

    print("Backup restored")


if __name__ == "__main__":
    main()
