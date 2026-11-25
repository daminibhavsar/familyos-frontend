import {useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import FamilyMemberForm from './components/Family/FamilyMemberForm.jsx'
import FamilyMemberList from './components/Family/FamilyMemberList.jsx'
import './App.css'

function App() {
  	const [count, setCount] = useState(0);

    //This state is used to get and set the members list
  	/* const [members, setMembers] = useState([
        {
            id: 1,
            name: 'Damini',
            relationship: 'Parent',
            dateOfBirth: ''
        },
        {
            id: 2,
            name: 'Nayan',
            relationship: 'Partner',
            dateOfBirth: ''
        },
        {
            id: 3,
            name: 'Ivaan',
            relationship: 'Child',
            dateOfBirth: ''
        }
    ]); */

    // This state is used to get and set the member for updating the member details
	const [editingMember, setEditingMember] = useState(null);

	const handleMemberAdded = (member) => {
        
        setMembers(previousMembers => [
            ...previousMembers,
            member
        ]);

    };

	const handleMemberDeleted = (id) => {
		setMembers(previousMembers => 
           previousMembers.filter(member=> member.id !== id)
        );
	};

	const handleEditMember = (member) => {
		setEditingMember(member);
	};

    const handleMemberSubmit = (formData) => {
        if (editingMember) {
            setMembers(previousMembers =>
            previousMembers.map(member =>
                member.id === editingMember.id
                ? { ...member, ...formData }
                : member
            )
            );

            setEditingMember(null);
            return;
        }

        const newMember = {
            id: Date.now(),
            ...formData
        };

        setMembers(previousMembers => [
            ...previousMembers,
            newMember
        ]);
    };

    return (
        <div>

            <h1 className='border-grey-100'>FamilyOS</h1>

            <FamilyMemberForm
                onMemberAdded={handleMemberAdded}
				editingMember={handleEditMember}
				onCancelEdit={() => setEditingMember(null)}
                handleMemberSubmit={handleMemberSubmit}
            />

            <FamilyMemberList
               // members={members}
				onMemberDeleted={handleMemberDeleted}
				onEditMember={handleEditMember}
            />

        </div>
    );
}

export default App;
