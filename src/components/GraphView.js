import React from "react";
import { ForceGraph2D } from "react-force-graph";
import { useEffect, useState, useRef, useCallback } from "react";

function GraphView() {
    const [graphData, setGraphData] = useState({ "links": [], "nodes": [] })
    const fgRef = useRef();

    const handleNodeClick = useCallback(node => {
        // // Aim at node from outside it
        // const distance = 90;
        // const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

        // fgRef.current.cameraPosition(
        //     { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        //     node, // lookAt ({ x, y, z })
        //     1500  // ms transition duration
        // );
        console.log(fgRef)
        console.log(node.tags)
    }, [fgRef]);

    const handleNodeHover = ((node)=>{
        if(node !==null){
            console.log(fgRef.current)

        }
        // const neighboringLinks = fgRef.current.graphData().links.filter(
        //     (link) => link.source === node || link.target === node
        //   );
      
        //   fgRef.current
        //     .linkColor((link) =>
        //       neighboringLinks.includes(link) ? 'red' : 'gray'
        //     );
    })

    const handleNodeColor = (node) => {
        var mappedTags = {
            "template":
            {
                "color": "#66ad79",
                "weight": 100
            },
            "project":
            {
                "color": "#028e7e",
                "weight": 80
            },
            "group":{
                "color":"#8e0260",
                "weight":80
            },
            "contact":{
                "color":"#dec2ea",
                "weight":80
            },
            "note":
            {
                "color": "#7966ad",
                "weight": 80
            },
        }
        var includedMappedTags = []

        if ("tags" in node) {
            node.tags.forEach((tag) => {
                if (tag in mappedTags) {
                    includedMappedTags.push(mappedTags[tag])
                }
            })
        }


        if (includedMappedTags.length > 0) {
            includedMappedTags.sort((a, b) => b.weight - a.weight);
            return includedMappedTags[0].color
        }
        return "pink"
    }

    useEffect(() => {
        fetch('http://localhost:5000/metadata')
            .then(response => response.json())
            .then(data => setGraphData(data))
            .catch(error => console.error(error));
    }, [])

    return (
        <div>
            {/* <button onClick={() => {
                var data = genRandomTree()
                console.log(data)
                setGraphData(data)
            }}>Random</button> */}
            <ForceGraph2D
                nodeRelSize={3}
                nodeVal={(node)=>{
                    if(node.backlinks!== undefined){
                        return node.backlinks.length
                    }else{
                        return 1
                    }
                }}
                graphData={graphData}
                onNodeClick={handleNodeClick}
                nodeColor={handleNodeColor}
                onNodeHover={handleNodeHover}
                onNodeDragEnd={node => {
                    node.fx = node.x;
                    node.fy = node.y;
                    node.fz = node.z;
                }
                }
                nodeLabel={node=>node.id}
                ref={fgRef}></ForceGraph2D>
        </div>
    )
}
export default GraphView