import React from 'react'
import { Stack } from 'react-bootstrap'
import { themes } from '../datalist'
import { useDispatch, useSelector } from 'react-redux'
import { changeTheme } from '../features/themeSlice'

const AppSettings = () => {

    const {theme} = useSelector(state=>state.theme)
    const dispatch = useDispatch()

  return (
    <>
        <div className="mb-3">
            <h1 className="fs-3 text-1">
                Themes
            </h1>
        </div>
        <Stack className='flex-wrap' direction='horizontal' gap={3}>
            {
                themes?.map((t)=>{
                    return <h4 
                                key={t.id} 
                                className={`px-4 py-2 theme-btn m-0 text-uppercase fs-5 rounded-1 fw-light ${theme===t.value?'theme-active text-1 fw-normal':'text-2'}`}
                                role='button'
                                onClick={()=>dispatch(changeTheme(t.value))}
                            >
                                {t.value}
                            </h4>
                })
            }
        </Stack>
    </>
  )
}

export default AppSettings