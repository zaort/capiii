import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
 return (
  <div className="border border-gray-300 rounded p-4 shadow-md">
   <h2 className="text-xl font-bold">{post.title} </h2>
   {/* Add a potential truncation function if description is long */}
   <p className="my-2">{post.description}</p>

   {/* Display plan association */}
   {post.plan && (
    <p className="mt-3">
     Related Plan:
     <Link to={`/plans/${post.plan._id}`} className="text-blue-600 hover:underline">
      {post.plan.name}
     </Link>
    </p>
   )}

   <Link
    to={`/posts/${post._id}`}
    className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-blue-700"
   >
    Read More
   </Link>
  </div>
 );
};

export default PostCard;