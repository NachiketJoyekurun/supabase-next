import { supabase } from '@/utils/supabase'
import NavigationLinks from './buttons/NavigationLinks'
import Registratration from './buttons/Button'

const Navbar = ({ session }) => {
    return (
        <nav className='flex justify-between items-center p-3 mx-6'>
            <div>
                <p className='text-lg font-bold'>Workout</p>
            </div>
            {session?.user ? (
                <ul className='flex items-center gap-3'>
                    <NavigationLinks href={'/'} title={'Home'} />

                    <Registratration label={'Logout'}
                        onClick={() => supabase.auth.signOut()}
                    />
                </ul>
            ) : (
                <ul className='flex gap-2'>
                    <NavigationLinks href={'/login'} title={'Login'} />
                    <NavigationLinks href={'/signup'} title={'Signup'} />
                </ul>
            )}
        </nav>
    )
}

export default Navbar