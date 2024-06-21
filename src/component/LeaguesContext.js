import React, { createContext, useState, useEffect } from 'react';

const LeaguesContext = createContext();

const LeaguesProvider = ({ children }) => {
    const [leagues, setLeagues] = useState([]);
    const [info, setInfo] = useState({ nm: '', eml: '' });
    const [isModalVisible2, setModalVisible2] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const payload = { userId: '33' };
            const response = await fetch('https://api.bracketocracy.com/v1.0/api.php?query=league/getLeagues', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            setLeagues(data?.data?.leagues ?? []);
        } catch (error) {
            console.error(error);
        }
    };
    
    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };

    const addLeague = () => {
        setLeagues([...leagues, { title: info.nm, owner: { email: info.eml } }]);
        setInfo({ nm: '', eml: '' });
        toggleModal2();
    };

    // const addLeague = async (newLeague) => {
    //     try {
    //         const payload = { ...newLeague, userId: '33', allowInvitation: 0 };
    //         const response = await fetch('https://api.bracketocracy.com/v1.0/api.php?query=league/createLeague', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(payload),
    //         });
    //         const data = await response.json();
    //         setLeagues([...leagues, data?.data?.league]);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };


    const updateLeague = (index, updatedLeague) => {
        const updatedLeagues = leagues.map((league, i) =>
            i === index ? updatedLeague : league
        );
        setLeagues(updatedLeagues);
    };

    const deleteLeague = (index) => {
        const updatedLeagues = leagues.filter((_, i) => i !== index);
        setLeagues(updatedLeagues);
    };

    return (
        <LeaguesContext.Provider value={{ leagues, addLeague, updateLeague, deleteLeague, info , setInfo, toggleModal2, isModalVisible2 }}>
            {children}
        </LeaguesContext.Provider>
    );
};

export { LeaguesContext, LeaguesProvider };
