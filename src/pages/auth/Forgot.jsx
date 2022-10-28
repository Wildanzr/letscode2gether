import { Navbar, Footer } from '../../layout'
import { Forgot } from '../../components/form'

const ForgotPage = () => {
  return (
    <div className='flex flex-col items-center justify-between w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out'>
      <Navbar />
      <div className="flex flex-col items-center w-2/3 lg:w-1/3 justify-center">
        <p className='text-2xl lg:text-4xl text-center font-ubuntu'>Forgot Account?</p>
        <Forgot />
      </div>
      <Footer />
    </div>
  )
}

export default ForgotPage
