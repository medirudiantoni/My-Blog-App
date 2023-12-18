import React from 'react'

const PostCard = ({id, poster, title, category, status, date}) => {
  return (
    <div className="w-full h-fit">
        <div className="w-full border-b-2 py-3 hidden sm:grid grid-cols-12 hover:bg-slate-200">
            <div className="col-span-1 py-2 px-4 pb-1 flex items-center justify-between">
                <div className=""></div>
                <div className="">
                    <input type="checkbox" className='w-5 h-5' />
                </div>
            </div>
            <div className="sm:col-span-2 xl:col-span-1 p-2 pb-1 flex items-center">
                {poster ? (
                    <div className="w-20 h-20 bg-slate-900 overflow-hidden">
                        <img src={poster} alt={category} className='w-full h-full object-cover' />
                    </div>
                ) : <p>-</p>}
            </div>
            <div className="sm:col-span-3 xl:col-span-4 p-2 pb-1 flex items-center">
                <p className='font-semibold'>{title}</p>
            </div>
            <div className="sm:col-span-2 xl:col-span-2 p-2 pb-1 flex items-center">{category}</div>
            <div className="sm:col-span-2 xl:col-span-2 p-2 pb-1 flex items-center">{status}</div>
            <div className="sm:col-span-2 xl:col-span-2 p-2 pb-1 flex items-center">{date}</div>
        </div>

        <div className="flex flex-wrap gap-3 sm:hidden pt-5 pb-2 border-b-2">
            <div className="w-fit">
                <div className="w-20 h-20 bg-slate-900 overflow-hidden rounded-md">
                    <img src={poster} alt={category} className='w-full h-full object-cover' />
                </div>
            </div>
            <div className="flex-1">
                <p className="font-semibold">{title}</p>
            </div>
            <div className="w-full h-fit flex flex-wrap gap-2 py-1 text-xs">
                <p>{category}</p>.
                <p>{status}</p>.
                <p>{date}</p>
            </div>
        </div>

    </div>
  )
}

export default PostCard