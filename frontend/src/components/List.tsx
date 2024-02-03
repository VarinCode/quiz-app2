import { ReactElement, FC, ReactNode } from 'react'

interface ListPorps {
    children: ReactNode
}

const List:FC<ListPorps> = ({ children }):ReactElement => (
    <ul className="w-full list-none">
        {children}
    </ul>
)

export default List