import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { ButtonWhite } from '../../Components/Buttons/Button1'
import { PostContext } from '../../context/Post/PostContext'

const PostPreview = () => {
  const {handlePreview, article} = useContext(PostContext)
  const PostContent = article.blocks
  console.log(PostContent)
  return (
        <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed z-[1000] top-0 left-0 w-screen h-screen bg-white overflow-y-scroll">
            <div className="p-5 lg:px-10 border-b-2 flex items-center justify-between">
                <p className="text-xl font-semibold text-slate-600">Preview</p>
                <ButtonWhite name={'close'} onClick={handlePreview} />
            </div>
            <div className="w-full h-fit p-5 lg:px-10">
                {PostContent.map((block, i) => {
                    if(block.data.items){
                        if(block.data.style === "unordered"){
                            return (
                                <ul style={{listStyle: 'inside'}}>
                                    {block.data.items.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            )
                        }
                    } else {
                        return <div style={{textAlign: block.data.alignment}} key={i} dangerouslySetInnerHTML={{__html: block.data.text}} />
                    }
                })}
            </div>
        </motion.div>
  )
}

export default PostPreview