import CommentsTemplate from "./CommentsTemplate";
import AddComment from "./AddComment";
import useComments from "../../../api/comment/user/useComments";

export default function Comments({ productId }) {
  const { data: comments } = useComments(productId);
  return (
    <div className="border p-4 mb-20 rounded-xl">
      <>
        {comments?.length > 0 ? (
          comments?.map((comment) => (
            <CommentsTemplate comment={comment} key={comment?.id} />
          ))
        ) : (
          <div className="text-xl text-center w-full bg-gray-200 dark:bg-black-200 mt-10">
            Be the first to comment.
          </div>
        )}
        <div className="mt-20 md:px-12">
          <h3 className="lg:text-lg sm:text-base text-sm font-bold mb-2">
            Add Comment and Rating
          </h3>
          <p className="md:text-sm text-xs text-gray-600 mb-4">
            Please read the rules and regulations before writing your opinion
            about this product.
          </p>

          <AddComment productId={productId} />
        </div>
      </>
    </div>
  );
}
