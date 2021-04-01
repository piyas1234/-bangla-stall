import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { faEdit, faHandMiddleFinger } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {Link} from 'react-router-dom'
const NavBody = () => {
    return (
        <div className="mt-2">
             <h4 className="m-4"><FontAwesomeIcon className="text-white" icon={faHandMiddleFinger}></FontAwesomeIcon> <Link className="text-white" to="/admin">Admin</Link></h4>
             <h4 className="m-4"><FontAwesomeIcon className="text-white" icon={faProductHunt}></FontAwesomeIcon><Link className="text-white" to="/addproduct">Add Product</Link></h4>
             <h4 className="m-4"><FontAwesomeIcon className="text-white" icon={faEdit}></FontAwesomeIcon><Link className="text-white" to="/editproduct">editproduct</Link></h4>
        </div>
    );
};

export default NavBody;