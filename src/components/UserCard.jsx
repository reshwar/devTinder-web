const UserCard = ({ userData }) => {
  console.log("userData", userData);
  const { firstname, lastname, profileUrl } = userData;
  return (
    <div className="flex justify-center mt-12">
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            //src={profileUrl}
            alt="Pic"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstname + " " + lastname}</h2>
          <div className="card-actions gap-7 justify-center">
            <button className="btn btn-secondary">Ignore</button>
            <button className="btn btn-primary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
