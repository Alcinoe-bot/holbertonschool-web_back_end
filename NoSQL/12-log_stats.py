#!/usr/bin/env python3
""" Module 12-log_stats"""

from pymongo import MongoClient
if __name__ == "__main__":
    client = MongoClient('mongodb://127.0.0.1:27017')
    logs = client.logs.nginx
    logs_number = logs.count_documents({})
    GET_number = logs.count_documents({"method": "GET"})
    POST_number = logs.count_documents({"method": "POST"})
    PUT_number = logs.count_documents({"method": "PUT"})
    PATCH_number = logs.count_documents({"method": "PATCH"})
    DELETE_number = logs.count_documents({"method": "DELETE"})
    docs_number = logs.count_documents({"method": "GET", "path": "/status"})

    print("{} logs".format(logs_number))
    print("Methods:")
    print("\tmethod GET: {}".format(GET_number))
    print("\tmethod POST: {}".format(POST_number))
    print("\tmethod PUT: {}".format(PUT_number))
    print("\tmethod PATCH: {}".format(PATCH_number))
    print("\tmethod DELETE: {}".format(DELETE_number))
    print("{} status check".format(docs_number))
