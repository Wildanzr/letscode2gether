import { Link } from 'react-router-dom'

const Breadcrumb = (props) => {
  const { paths } = props
  return (
    <div className="text-sm font-ubuntu font-light breadcrumbs">
      <ul className='mb-0'>
        {paths.map((path, index) => (
          <li key={index} >
            <Link
              to={path.target}
              className="text-main dark:text-snow hover:text-main dark:hover:text-snow duration-300 ease-in-out"
            >
              {path.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Breadcrumb
