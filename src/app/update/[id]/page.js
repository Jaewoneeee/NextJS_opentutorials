"use client"

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {
    const [title, setTtitle] = useState('')
    const [description, setDescription] = useState('')
    const router = useRouter();
    const params = useParams();
    const id = params.id
    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URL+"topics/"+id)
            .then(res => res.json())
            .then(result => {
                setTtitle(result.title)
                setDescription(result.description)
                console.log(result)
            })
    },[])
    return (
        <form onSubmit={(e)=>{
            e.preventDefault();
            const title = e.target.title.value;
            const description = e.target.description.value; 
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, description})
            }
            fetch(process.env.NEXT_PUBLIC_API_URL+`topics/` + id, options)
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    const lastid = result.id;
                    router.refresh();
                    router.push(`/read/${lastid}`)
                })
        }}>
            <p>
                <input type="text" name="title" placeholder="title" value={title} onChange={e=>setTtitle(e.target.value)}></input>
            </p>
            <p>
                <textarea name="description" placeholder="description" value={description} onChange={e=>setDescription(e.target.value)}></textarea>
            </p>
            <p>
                <input type="submit" value="create" />
            </p>
        </form>
    )
}