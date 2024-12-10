"use client"
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from "react"
import Image from 'next/image'
import Post from '@/components/Post'

const Page = () => {
    const { appInitialized } = useAuth()
    const [allPosts, setAllPosts] = useState(null)
    const [error, setError] = useState('')
    const [selectedPost, setSelectedPost] = useState(null)

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
        <>
            <div className='w-[600px] text-center flex flex-col gap-4'>
                <p className="font-bold text-[30px]">Explore all recipes</p>
                {allPosts ? (
                    <div className='flex'>
                        {allPosts.map((post, index) => (
                            <div 
                                className='relative w-[200px] h-[200px] cursor-pointer'
                                key={index}
                                onClick={() => setSelectedPost(post)}
                            >
                                <Image
                                    src={post.imageUrl}
                                    alt={post.title}
                                    fill
                                    className='object-cover'
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>

            {selectedPost && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                    onClick={() => setSelectedPost(null)}
                >
                    <div 
                        className="bg-white w-[600px] max-h-[90vh] overflow-y-auto"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="p-4">
                            <button 
                                className="mb-4 px-4 py-2 bg-gray-200 rounded"
                                onClick={() => setSelectedPost(null)}
                            >
                                Close
                            </button>
                            <Post {...selectedPost} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Page