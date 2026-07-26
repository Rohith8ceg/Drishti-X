"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { ReactFlow, Controls, Background, applyNodeChanges, type Node, type Edge, type OnNodesChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { getNetworkData } from '@/lib/mockData';

const explainers = {
  default: 'Vehicle theft in this cluster rose 23% after a festival parking shortage and repeated sightings of a known associate.',
  suspicious: 'The linked phone and vehicle pattern suggests a coordinated movement corridor between Whitefield and KR Market.',
};

export default function NetworkGraph() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useEffect(() => {
    const data = getNetworkData();
    setNodes(data.nodes.map((node: any) => ({ ...node, data: { ...node.data, color: '#06b6d4' } })));
    setEdges(data.edges);
  }, []);

  const selectedExplainer = useMemo(() => {
    if (!selectedNode) return explainers.default;
    if (selectedNode.id.includes('NET')) return explainers.suspicious;
    return `Pattern link for ${selectedNode.data?.label}: repeated vehicle and suspect overlap indicate rising threat intensity.`;
  }, [selectedNode]);

  const onNodesChange: OnNodesChange = (changes) => {
    setNodes((current) => applyNodeChanges(changes, current));
  };

  return (
    <div className="glass-panel p-4 rounded-lg shadow-lg h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-xl font-bold text-drishti-cyan">Criminal Network</h2>
          <p className="text-xs text-gray-400">Click a node to inspect the pattern explainer</p>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-gray-400">
          Interactive graph
        </div>
      </div>

      <div className="flex-1 min-h-[420px] rounded-2xl border border-white/10 overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          onNodesChange={onNodesChange}
          onNodeClick={(_, node) => setSelectedNode(node)}
          defaultEdgeOptions={{ type: 'smoothstep' }}
          minZoom={0.35}
          style={{ width: '100%', height: '100%' }}
        >
          <Controls />
          <Background gap={12} size={1} />
        </ReactFlow>
      </div>

      <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-3">
        <div className="text-[10px] uppercase tracking-[0.24em] text-drishti-cyan">Pattern explainer</div>
        <div className="mt-2 text-sm font-semibold text-white">{selectedNode ? String(selectedNode.data?.label ?? 'Selected node') : 'Select a network node'}</div>
        <div className="text-[11px] text-gray-400 mt-1">{selectedExplainer}</div>
      </div>
    </div>
  );
}
