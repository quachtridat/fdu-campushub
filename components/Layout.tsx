type LayoutPropsType = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Layout: React.FC<LayoutPropsType> = ({ children, ...otherProps }) => {
  return (
    <div {...otherProps}>
      {children}
    </div>
  )
}

export default Layout;