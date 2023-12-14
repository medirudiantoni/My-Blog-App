import React from 'react'

export const ButtonWhite = ({name, onClick, wFull}) => {
  return (
    <button onClick={onClick} className={`py-2 px-4 bg-white text-gray-900 border-2 rounded-lg text-sm hover:bg-slate-200 active:scale-95 duration-100 ${ wFull ? 'w-full' : '' }`}>{name}</button>
  )
}
export const ButtonBlue = ({name, onClick, wFull}) => {
  return (
    <button onClick={onClick} className={`py-2 px-4 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 active:bg-blue-900 active:scale-95 duration-100 ${ wFull ? 'w-full' : '' }`}>{name}</button>
  )
}
export const ButtonRed = ({name, onClick, wFull}) => {
  return (
    <button onClick={onClick} className={`py-2 px-4 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 active:bg-red-900 active:scale-95 duration-100 ${ wFull ? 'w-full' : '' }`}>{name}</button>
  )
}
export const ButtonGreen = ({name, onClick, wFull}) => {
  return (
    <button onClick={onClick} className={`py-2 px-4 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 active:bg-green-900 active:scale-95 duration-100 ${ wFull ? 'w-full' : '' }`}>{name}</button>
  )
}
export const ButtonOrange = ({name, onClick, wFull}) => {
  return (
    <button onClick={onClick} className={`py-2 px-4 bg-orange-600 text-white rounded-lg text-sm hover:bg-orange-700 active:bg-orange-900 active:scale-95 duration-100 ${ wFull ? 'w-full' : '' }`}>{name}</button>
  )
}