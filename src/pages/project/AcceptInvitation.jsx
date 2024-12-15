import { Button } from '@/components/ui/button'
import { acceptInvitation } from '@/redux/project/Action';
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';

const AcceptInvitation = () => {
    const location = useLocation(); //4h17min
    const dispatch = useDispatch();
    //scraping token which is a query param, from url 4h13min https://www.youtube.com/watch?v=qis9sMaiqN4&t=12885s&ab_channel=CodeWithZosh
    const navigate = useNavigate();
    const handleAcceptInviatation = () => {
        const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
        dispatch(acceptInvitation({invitationToken:token, navigate}))
    }
  return (
    <div className='h-[85vh] flex flex-col justify-center items-center'>
        <h1 className='py-5 font-semibold text-xl'>You are invited to join the project</h1>
        <Button onClick={handleAcceptInviatation}>Accept Invitation</Button>
    </div>
  )
}

export default AcceptInvitation