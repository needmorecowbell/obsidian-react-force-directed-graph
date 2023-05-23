import json
from pprint import pprint
from flask import Flask, jsonify
from flask_cors import CORS

class ObsidianBackend():
    def __init__(self):
        self.app = Flask(__name__)
        CORS(self.app)

        @self.app.route('/')
        def index():
            return jsonify({"msg":"Obsidian backend server", "success":True})

        @self.app.route("/metadata")
        def getMetadata():
            md = {}
            try:
                with open("/home/adam/Notes/.obsidian/plugins/metadata-extractor/metadata.json") as f:
                     md = json.load(f)
                return jsonify(self.translateMetadata(md))
            except Exception as e:
                return jsonify({"msg":f"Failure: {str(e)}", "success":False}) 
        
    def run(self):
        self.app.run()
        
    def translateMetadata(self,metadata)->dict:
                result = {"nodes":[],"links":[]}
                for node in metadata:
                    node["id"]=node["relativePath"]
                    result["nodes"].append(node)
                    for backlink in node.get("backlinks",[]):
                        link = {"source":node["relativePath"],"target":backlink["relativePath"]}
                        result["links"].append(link)
                return result        

    


if __name__ =="__main__":

    app = ObsidianBackend()
    app.run()
