import { useAuthContext } from '../utils/auth';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '../utils/qandm';

const PostCard = ({ post }) => {
 const { user } = useAuthContext();
 const [deletePost, { loading, error }] = useMutation(DELETE_POST);

 const handleDelete = async () => {
  // Add confirmation logic (if desired) before deleting
  try {
   await deletePost({ variables: { postId: post._id } });
   // Potentially handle post deletion in the parent component (e.g., remove from a list)
  } catch (error) {
   console.error('Error deleting post:', error);
   // Handle potential errors
  }
 };

 return (
  <div className="border border-gray-200 rounded-lg shadow-md p-4">
   {/* ... Render post data: title, description, etc.  */}
   <h3 className="text-lg font-bold">{post.title}</h3>
   <p className="text-gray-700">{post.description}</p>

   {/* ... Potentially display post creation information, provider */}

   {/* Conditional Delete Button */}
   {user && user._id === post.provider._id && (
    <button
     onClick={handleDelete}
     disabled={loading}
     className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
    >
     Delete Post
    </button>
   )}
  </div>
 );
};

export default PostCard;