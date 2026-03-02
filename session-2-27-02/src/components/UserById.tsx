// useEffect dependency
    
// Build a small “user by ID” viewer: one state for userId, one for user. Use useEffect to fetch when userId changes. Include cleanup so that if the request finishes after userId changed or the component unmounted, you don’t call setUser.


import { useEffect, useState, type ChangeEvent } from "react";

type UserState = {
    firstName: string;
    email: string;
    age: number;
};



export default function FetchUserById() {
    const [userId, setUserId] = useState(0);
    const [user, setUser] = useState<Partial<UserState>>({});
    useEffect(() => {
        let cancelled = false;

        fetch(`https://dummyjson.com/users/${userId}?select=firstName,age,email`)
            .then((res) => {
                return res.json();
            })
            .then((res: UserState) => {
                if (!cancelled) {
                    setUser(res);
                } else {
                    console.log(
                        `Setuser won't get called for user id ${userId} change in userid or component unmounted`,
                    );
                }
            });

        return () => {
            console.log("cleanp function called for userid ", userId);
            cancelled = true;
        };
    }, [userId]);
    return (
        <>
            <input
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const id = parseInt(e.target.value);
                    if (id) {
                        setUserId(id);
                    }
                }}
            />
            {user.firstName ? (
                <div>
                    <p>Username:{user.firstName}</p>
                    <p>Age:{user.age}</p>
                    <p>Email:{user.email}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}
