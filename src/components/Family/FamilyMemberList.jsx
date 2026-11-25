import FamilyMemberCard from "./FamilyMemberCard";
import { useEffect, useState } from 'react';

function FamilyMemberList({onMemberDeleted, onEditMember}) {

    const [members, setMembers] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        async function loadMembers() {
            try{
                const response = await fetch(
                    'http://127.0.0.1:8000/api/family-members',
                    {
                        headers: {
                            Accept:'application/json'
                        },
                    }
                ); 
                
                if(!response.ok) {
                    throw new Error('Could not load family members');
                }
                //console.log(await response.json());
                setMembers(await response.json());
            } catch(err) {
                setErrors(err.message);
            }
        }

        loadMembers();
    },[]);

    if (errors) return <p>Error: {errors}</p>;
    
    return (
        <div>
            <h2> Family Members</h2>
            {members.map(member=>(
                <FamilyMemberCard key={member.id} member={member} onMemberDeleted={onMemberDeleted} onEditMember={onEditMember}/>
            ))}
        </div>
    );
}

export default FamilyMemberList;