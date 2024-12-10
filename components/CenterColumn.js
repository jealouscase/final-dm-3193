"use client"
import Post from "./Post"
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from "react"

const CenterColumn = () => {
    const { appInitialized } = useAuth()
    const [allPosts, setAllPosts] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!appInitialized) return

        const db = getFirestore(appInitialized)
        const postsRef = collection(db, "recipes")
        
        getDocs(postsRef)
            .then((querySnapshot) => {
                if (!querySnapshot) {
                    return []
                }

                const posts = []
                querySnapshot.forEach((post) => {
                    const postData = post.data()
                    posts.push(postData)
                })

                setAllPosts(posts)
                console.log(posts)
            })
            .catch((error) => {
                console.error(error)
                setError(error.message)
            })
    }, [appInitialized])

    return (
        <div className="w-[600px] h-full">
            {allPosts ? (
                <div>
                    {allPosts.map((post, index) => (
                        <Post 
                            key={index}
                            userId={post.userId}
                            ingredients={post.ingredients}
                            instructions={post.instructions}
                            createdAt={post.createdAt}
                            difficulty={post.difficulty} 
                            totalTime={post.totalTime}
                            title={post.title}
                            servings={post.servings}
                            imageUrl={post.imageUrl}
                        />
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
            {error.length > 1 && "An error occurred while fetching the posts:" + error}
        </div>
    )
}

export default CenterColumn