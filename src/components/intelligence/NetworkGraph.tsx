import React, { useEffect, useState } from 'react';
import ReactFlow, { MiniMap, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { getNetworkData } from '@/lib/mockData';

export default function NetworkGraph() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);

  useEffect(() => {
    const data = getNetworkData();
    setNodes(data.nodes);
    setEdges(data.edges);
  }, []);

  return (
    <div className="glass-panel p-4 rounded-lg shadow-lg h-full">
      <h2 className="text-xl font-bold mb-4 text-drishti-cyan">Criminal Network</h2>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <MiniMap />
        <Controls />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
