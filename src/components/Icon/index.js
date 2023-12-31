import {BsChevronLeft, BsChevronRight, BsGithub, BsTwitter, BsCartPlus, BsCart4} from 'react-icons/bs';
import {RiLoginBoxLine, RiLockPasswordFill} from 'react-icons/ri';
import {FaUserAlt, FaArrowDown, FaArrowUp} from 'react-icons/fa';
import {ImHome} from 'react-icons/im';
import {GiShoppingBag} from 'react-icons/gi';
import {AiFillEye, AiFillEyeInvisible, AiOutlinePlus, AiOutlineMinus, AiOutlineGooglePlus, AiFillEdit} from 'react-icons/ai';



export default {
    ArrowLeft: <BsChevronLeft/>,
    ArrowRight: <BsChevronRight/>,
    ArrowDown: <FaArrowDown/>,
    ArrowUp: <FaArrowUp/>,
    Login: <RiLoginBoxLine />,
    User: <FaUserAlt/>,
    Password: <RiLockPasswordFill/>,
    Home: <ImHome/>,
    Eye: <AiFillEye />,
    EyeInvisible: <AiFillEyeInvisible/>,
    Github: <BsGithub />,
    Twitter: <BsTwitter/>,
    Plus: <AiOutlinePlus/>,
    Minus: <AiOutlineMinus/>,
    CartPlus: <BsCartPlus/>,
    Cart: <BsCart4/>,
    ShoppingBag: <GiShoppingBag/>,
    Google: <AiOutlineGooglePlus/>,
    Edit: <AiFillEdit></AiFillEdit>
}