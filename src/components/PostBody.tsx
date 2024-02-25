interface Props {
  msg: string;
}

const PostBody = ({ msg }: Props) => {
  return (
    <div className="py-6 pl-2 p-2 mb-4 text-gray-700 bg-custom-light-brown border-custom-light-brown rounded">
      <p>{msg}</p>
    </div>
  );
};

export default PostBody;
