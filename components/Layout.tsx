type Props = React.ComponentProps<'div'>

const Layout: React.FC<Props> = ({ children, ...otherProps }) => {
  return <div {...otherProps}>{children}</div>
}

export default Layout
