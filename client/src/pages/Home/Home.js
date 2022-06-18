import { useContext, useEffect, useState } from 'react';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import Blogs from './Blogs';
import { GlobalContext } from '../../context/GlobalState';
import { Nav, Button, Container, Form } from 'react-bootstrap';


const Home = () => {
    const { blogs, error, Logout, getBlogs, id } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [allblogs, setBlogs] = useState(blogs)

    useEffect(() => {
        function bringingAll() {
            getBlogs()
            setBlogs(blogs)
        }
        if (!document.cookie) {
            navigate('/login')
        }
        else {
            bringingAll();
        }
        // eslint-disable-next-line 
    }, [setBlogs, navigate, getBlogs, blogs])


    return (
        <>
            <p>{error}</p>
            <Nav variant="pills" defaultActiveKey="/" className="justify-content-center gap-5 m-3" >
                <Nav.Item>
                    <Button onClick={() => navigate('/profile')}>Post Blog</Button>
                </Nav.Item>
                <Nav.Item><Form.Control type="text" placeholder='Search Blog Title...'/></Nav.Item>
                <Nav.Item>
                    <Button onClick={() => { Logout(); navigate('/login')}}>Logout</Button>
                </Nav.Item>
            </Nav>
            <Container className='App-header' style={{ marginTop: '5vh' }}>
                {
                    allblogs.length > 0 &&
                    allblogs.map(ele => (<Blogs key={ele.id} blogs={ele} id={id}/>))
                }
            </Container>
        </>
    )
}

export default Home