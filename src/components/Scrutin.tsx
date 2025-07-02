import { useEffect, useState } from "react";
import React from "react";
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonBadge, IonButton, IonIcon } from '@ionic/react';
import { chevronForwardOutline } from 'ionicons/icons';
import { useHistory } from "react-router-dom";


const Scrutin: React.FC = () => {
  const [scrutins, setScrutins] = useState<Scrutin[]>([]);
  const history = useHistory();

    interface Scrutin {  
        id: number;
        title: string;
        starts_at: string;
        ends_at: string;
        date: string;
    }
    useEffect(() => {
     
      const fetchScrutins = async () => {
       
        const response = await fetch('/api/v1/scrutins');
        const dataScrutins = await response.json();
        setScrutins(dataScrutins.data);
      };

      fetchScrutins();

    }, []);     


    const handleViewDetails = (id: number) => {
        history.push(`/scrutin/${id}`);
    };


//  const toggleStat = (id: string) => {
//     <ScrutinMembersTable id={id} />;     
//     console.log(`Toggle stat for scrutin ID: ${id}`);  
//   };  


    

  const goToStats = (scrutinId:number) => {
    history.push(`/stats/${scrutinId}`);
  };



    return (    

    <div style={{ height: '100vh', overflowY: 'auto', padding: '16px' }}>
      {scrutins.map((scrutin) => (
        <IonCard key={scrutin.id} style={{ marginBottom: '16px' }}>
          <IonCardHeader>
            <IonCardTitle>
              {scrutin.title}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem lines="none">
                <IonLabel>Date de début: {new Date(scrutin.starts_at).toLocaleDateString()}</IonLabel>
                <IonLabel>Date de fin: {new Date(scrutin.ends_at).toLocaleDateString()}</IonLabel>
                <IonBadge color="primary" slot="end">
                    {scrutin.date}
                </IonBadge>
                <IonBadge color="secondary" slot="end">
                    {scrutin.id}
                </IonBadge>
            </IonItem>
            <IonButton onClick={() => handleViewDetails(scrutin.id)}>
              Voir les détails
              <IonIcon slot="end" icon={chevronForwardOutline} />
            </IonButton>
            {/* <IonButton expand="full" onClick={() => toggleStat(id)}>Toggle Stat</IonButton> */}
            <IonButton onClick={() => goToStats(scrutin.id)} style={{ marginTop: '8px' }}>
              View Stats
            </IonButton>
          </IonCardContent>
        </IonCard>
      ))}
    </div>  
    );
}
export default Scrutin;