// src/lib/mockData.ts
export const getTimelineEvents = () => {
  // Simple mock: return first 20 crimes sorted by timestamp
  return mockData.crimes
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    .slice(0, 20)
    .map(cr => ({ time: new Date(cr.timestamp).toLocaleString(), title: `${cr.type} at ${cr.district}` }));
};

export const getNetworkData = () => {
  const network = mockData.networks[0];
  if (!network) return { nodes: [], edges: [] };

  const memberIds = [...new Set([network.leader_id, ...network.member_ids])].slice(0, 5);
  const members = memberIds
    .map((id) => mockData.suspects.find((suspect) => suspect.id === id))
    .filter((suspect): suspect is Suspect => Boolean(suspect));
  const linkedCrime = mockData.crimes.find((crime) =>
    crime.suspect_ids.some((id) => memberIds.includes(id)),
  ) ?? mockData.crimes[0];
  const vehicleId = `${network.id}-vehicle`;

  const nodes = [
    { id: network.id, data: { label: network.name, kind: 'Network', detail: `${network.threat_level} threat` }, position: { x: 40, y: 180 }, style: { background: '#164e63', border: '1px solid #22d3ee', color: '#ecfeff', borderRadius: 12, padding: 10 } },
    ...members.map((member, index) => ({
      id: member.id,
      data: { label: member.alias, kind: index === 0 ? 'Leader' : 'Associate', detail: `${member.crimes_count} linked cases` },
      position: { x: 280, y: 40 + index * 105 },
      style: { background: index === 0 ? '#7f1d1d' : '#312e81', border: '1px solid #a78bfa', color: '#f5f3ff', borderRadius: 12, padding: 10 },
    })),
    { id: vehicleId, data: { label: members[0]?.vehicles[0] ?? 'KA-01-M-4821', kind: 'Vehicle', detail: 'Repeated CCTV sighting' }, position: { x: 575, y: 105 }, style: { background: '#78350f', border: '1px solid #fbbf24', color: '#fffbeb', borderRadius: 12, padding: 10 } },
    { id: linkedCrime.id, data: { label: linkedCrime.type, kind: 'Linked FIR', detail: `${linkedCrime.district} · ${linkedCrime.fir_number}` }, position: { x: 575, y: 300 }, style: { background: '#7f1d1d', border: '1px solid #fb7185', color: '#fff1f2', borderRadius: 12, padding: 10 } },
  ];

  const edges = members.flatMap((member, index) => [
    { id: `${network.id}-${member.id}`, source: network.id, target: member.id, animated: index === 0, style: { stroke: '#22d3ee' } },
    ...(index === 0 ? [
      { id: `${member.id}-${vehicleId}`, source: member.id, target: vehicleId, animated: true, style: { stroke: '#fbbf24' } },
      { id: `${member.id}-${linkedCrime.id}`, source: member.id, target: linkedCrime.id, animated: true, style: { stroke: '#fb7185' } },
    ] : []),
  ]);

  return { nodes, edges };
};


export type CrimeType = 'Burglary' | 'Chain Snatching' | 'Cybercrime' | 'Homicide' | 'Narcotics' | 'Vehicle Theft';
export type Severity = 'High' | 'Medium' | 'Low';
export type Status = 'Open' | 'Closed' | 'Under Investigation';

export interface CrimeRecord {
  id: string;
  fir_number: string;
  type: CrimeType;
  district: string;
  station: string;
  timestamp: string; // ISO date
  lat: number;
  lng: number;
  severity: Severity;
  status: Status;
  suspect_ids: string[];
  evidence_ids: string[];
  description: string;
}

export interface Suspect {
  id: string;
  name: string;
  alias: string;
  age: number;
  district: string;
  risk_score: number; // 0-100
  crimes_count: number;
  gang_id?: string;
  associates: string[]; // suspect ids
  vehicles: string[];
  phones: string[];
}

export interface Network {
  id: string;
  name: string;
  leader_id: string;
  member_ids: string[];
  operating_districts: string[];
  threat_level: Severity;
  primary_crimes: CrimeType[];
}

export interface District {
  name: string;
  code: string;
  lat: number;
  lng: number;
  risk_score: number;
}

const DISTRICTS = [
  { name: 'Bengaluru Urban', code: 'KA-01', lat: 12.9716, lng: 77.5946 },
  { name: 'Mysuru', code: 'KA-09', lat: 12.2958, lng: 76.6394 },
  { name: 'Hubballi-Dharwad', code: 'KA-25', lat: 15.3647, lng: 75.1240 },
  { name: 'Mangaluru', code: 'KA-19', lat: 12.9141, lng: 74.8560 },
  { name: 'Belagavi', code: 'KA-22', lat: 15.8497, lng: 74.4977 },
];

// Deterministic random generator for consistent mock data
let seed = 12345;
const random = () => {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
};
const randInt = (min: number, max: number) => Math.floor(random() * (max - min + 1)) + min;
const randChoice = <T>(arr: T[]): T => arr[randInt(0, arr.length - 1)];
const generateId = (prefix: string) => `${prefix}-${randInt(1000, 9999)}-${randInt(1000, 9999)}`;

export const generateMockData = () => {
  const suspects: Suspect[] = [];
  const crimes: CrimeRecord[] = [];
  const networks: Network[] = [];
  
  // Generate Suspects (150+)
  const firstNames = ['Raju', 'Kumar', 'Manjula', 'Suresh', 'Prakash', 'Ganesh', 'Kavitha', 'Shiva', 'Kiran', 'Ramesh'];
  const aliases = ['Blade', 'Bullet', 'Snake', 'Silent', 'Tiger', 'Black', 'Speed', 'Ghost'];
  
  for (let i = 0; i < 155; i++) {
    suspects.push({
      id: generateId('SUS'),
      name: `${randChoice(firstNames)} ${randChoice(firstNames)}`,
      alias: `${randChoice(aliases)} ${randChoice(firstNames)}`,
      age: randInt(18, 55),
      district: randChoice(DISTRICTS).name,
      risk_score: randInt(20, 95),
      crimes_count: randInt(0, 15),
      associates: [],
      vehicles: [`KA-${randInt(10, 50)}-${randChoice(['M','A','C'])}-${randInt(1000, 9999)}`],
      phones: [`+91 9${randInt(100000000, 999999999)}`],
    });
  }

  // Assign associations
  suspects.forEach(s => {
    const numAssociates = randInt(0, 3);
    for (let i = 0; i < numAssociates; i++) {
      const associate = randChoice(suspects);
      if (associate.id !== s.id && !s.associates.includes(associate.id)) {
        s.associates.push(associate.id);
      }
    }
  });

  // Generate Networks (25)
  for (let i = 0; i < 25; i++) {
    const members = suspects.filter(s => random() > 0.9).map(s => s.id);
    if (members.length === 0) members.push(suspects[0].id);
    const leader = members[0];
    networks.push({
      id: generateId('NET'),
      name: `${randChoice(DISTRICTS).name} ${randChoice(['Boys', 'Syndicate', 'Gang', 'Cartel'])}`,
      leader_id: leader,
      member_ids: members,
      operating_districts: [randChoice(DISTRICTS).name, randChoice(DISTRICTS).name],
      threat_level: randChoice(['High', 'Medium', 'Low']) as Severity,
      primary_crimes: [randChoice(['Burglary', 'Chain Snatching', 'Narcotics']) as CrimeType],
    });
  }

  // Generate Crimes (500+)
  const crimeTypes: CrimeType[] = ['Burglary', 'Chain Snatching', 'Cybercrime', 'Homicide', 'Narcotics', 'Vehicle Theft'];
  
  for (let i = 0; i < 505; i++) {
    const district = randChoice(DISTRICTS);
    const date = new Date(2025, randInt(0, 11), randInt(1, 28));
    
    crimes.push({
      id: generateId('CRM'),
      fir_number: `FIR-${date.getFullYear()}-${randInt(100, 999)}`,
      type: randChoice(crimeTypes),
      district: district.name,
      station: `${district.name} Central`,
      timestamp: date.toISOString(),
      lat: district.lat + (random() - 0.5) * 0.1,
      lng: district.lng + (random() - 0.5) * 0.1,
      severity: randChoice(['High', 'Medium', 'Low']) as Severity,
      status: randChoice(['Open', 'Closed', 'Under Investigation']) as Status,
      suspect_ids: random() > 0.5 ? [randChoice(suspects).id] : [],
      evidence_ids: [generateId('EVD'), generateId('EVD')],
      description: `Incident reported near main highway involving a ${randChoice(['two-wheeler', 'four-wheeler'])}. Witness statements recorded.`,
    });
  }

  return { suspects, networks, crimes, districts: DISTRICTS };
};

// Singleton data instance to be used across the app
export const mockData = generateMockData();
