import { members } from '../api';

// Match each absence with a member
const absenceName = (absence) => {
    return (
        members()
            .then(members => members.find(member => member.userId === absence.userId))
            .then(member => absence.name = member.name)
    )
}

export default absenceName;