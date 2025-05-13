const UserCard = ({ userData }) => {
  const { firstname, lastname, profileUrl, age, gender, about } = userData;
  return (
    <div className="flex justify-center mt-12">
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure class="w-96 h-64 overflow-hidden">
          <img src={profileUrl} class="w-96 h-64 object-cover" alt="Avatar" />
        </figure>

        <div className="card-body">
          <h2 className="card-title">{firstname + " " + lastname}</h2>
          <p>
            {age},{gender}
          </p>
          <p>{about}</p>
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
