import { useEffect, useState } from "react";
import React from "react";
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonBadge, IonButton } from '@ionic/react';


const Members: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);

    interface Member {  
        id: number;
        first_name: string;
        last_name: string;
        birth_date: string;
        has_voted: number;
    }


  useEffect(() => {
    // Simulate fetching members from an API
    const fetchMembers = async () => {
      // Replace with actual API call
        const response = await fetch('/api/v1/members');
        const dataMembers = await response.json();
        setMembers(dataMembers.data);
    };

    fetchMembers();

  }
    , []);
  
  return (
    <div style={{ height: '100vh', overflowY: 'auto', padding: '16px' }}>
      {members.map((member) => (
        <IonCard key={member.id} style={{ marginBottom: '16px' }}>
          <IonCardHeader>
            <IonCardTitle>
              {member.first_name} {member.last_name}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem lines="none">
              <IonLabel>Date de naissance: {new Date(member.birth_date).toLocaleDateString()}</IonLabel>
              <IonBadge color={member.has_voted ? "success" : "medium"} slot="end">
                {member.has_voted ? "A voté" : "N'a pas voté"}
              </IonBadge>
              <IonButton fill="clear" slot="end" onClick={() => alert(`Détails de ${member.first_name} ${member.last_name}`)}>
                Détails
              </IonButton>
            </IonItem>
          </IonCardContent>
        </IonCard>
      ))}
    </div>
  );
}

export default Members;