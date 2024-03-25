import CounsellorForm from "./CounsellorForm"

function AddCounsellors() {
  return (
    <div  className="common-container">
    <div className="flex h-18">
        <img
        src="/assets/plus.png"
        alt="add user"
        width={80}
        className="pr-2"
        />
        <p className="p-2 mt-4 text-xl">Add a counsellor</p>
      </div>
      <CounsellorForm action="Create"/>
  </div>
  )
}

export default AddCounsellors