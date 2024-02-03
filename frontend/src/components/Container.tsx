import { ReactElement, ReactNode, FC } from 'react'

interface ContainerProps {
    children: ReactNode; 
}

const Container:FC<ContainerProps> = ({ children }):ReactElement => {
  return (
    <section className="relative w-full h-full">
        {children}
    </section>
  )
}

export default Container