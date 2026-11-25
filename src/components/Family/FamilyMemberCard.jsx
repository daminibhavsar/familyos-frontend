import {useState} from 'react';

function FamilyMemberCard({member,onMemberDeleted,onEditMember}) {

    const handleDelete = (member) => {
        onMemberDeleted(member.id);
    };
    
    return (
        <div key={member.id}>
            <h3>{member.name}</h3>
            <p>Relationship: {member.relationship}</p>
            <p>Date of Birth: {member.dateOfBirth}</p>
            <button onClick={() => onEditMember(member)}>
                Edit
            </button>
            <button onClick={() => handleDelete(member)}>
                Delete
            </button>
        </div>
    );
}

export default FamilyMemberCard;
