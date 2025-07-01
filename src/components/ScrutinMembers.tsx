import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonList } from '@ionic/react';

interface ScrutinDetailsProps {
  id: string;
}

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

const ScrutinMembers: React.FC = () => {
  const { id } = useParams<ScrutinDetailsProps>();
  const [members, setMembers] = useState<ScrutinMember[]>([]);

  useEffect(() => {
    const fetchScrutinDetails = async () => {
      try {
        const response = await fetch(`/api/v1/scrutins/${id}/members`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ScrutinMembersResponse = await response.json();
        console.log('Scrutin Members Data:', data);
        setMembers(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error('Error fetching scrutin details:', error);
        setMembers([]);
      }
    };

    fetchScrutinDetails();
  }, [id]);

  return (
    <div style={{ height: '100vh', overflowY: 'auto', padding: '16px' }}>
    <IonList>
      {members.map((member) => (
        <IonCard key={member.id}>
          <IonCardHeader>
            <IonCardTitle>{member.last_name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem lines="none">
              <IonLabel>Date de naissance: {new Date(member.birth_date).toLocaleDateString()}</IonLabel>
            </IonItem>
            <IonItem lines="none">
              <IonLabel>Nom: {member.last_name}</IonLabel>
            </IonItem>
            <IonItem lines="none">
              <IonLabel>Prénom: {member.first_name}</IonLabel>
            </IonItem>
            <IonItem lines="none">
              <IonLabel>Has Voted: {member.has_voted ? 'Yes' : 'No'}</IonLabel>
            </IonItem>
            <IonItem lines="none">
              <IonLabel>ID: {member.id}</IonLabel>
            </IonItem>
            <IonItem lines="none">
              <IonLabel>Scrutin ID: {id}</IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>
      ))}
    </IonList>
    </div>
  );
};

export default ScrutinMembers;
