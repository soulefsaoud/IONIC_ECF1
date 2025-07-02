import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Enregistrer les composants nécessaires de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

interface ScrutinMember {
  id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  has_voted: number;
}

interface ScrutinMembersResponse {
  data: ScrutinMember[];
}

// No props needed since we use useParams
const ScrutinMembersTable: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [members, setMembers] = useState<ScrutinMember[]>([]);

  useEffect(() => {
    const fetchScrutinDetails = async () => {
      try {
        
        const response = await fetch(`/api/v1/scrutins/${id}/members`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ScrutinMembersResponse = await response.json();
        setMembers(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error('Error fetching scrutin details:', error);
        setMembers([]);
      }
    };

    fetchScrutinDetails();
  }, [id]);

  // Calculer le nombre de membres qui ont voté et ceux qui n'ont pas voté
  const votedCount = members.filter(member => member.has_voted).length;
  const notVotedCount = members.length - votedCount;

  // Préparer les données pour le camembert
  const chartData = {
    labels: ['Voted', 'Not Voted'],
    datasets: [
      {
        data: [votedCount, notVotedCount],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Scrutin Members Vote Status for ID: ${id}`,
      },
    },
  };

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default ScrutinMembersTable;
