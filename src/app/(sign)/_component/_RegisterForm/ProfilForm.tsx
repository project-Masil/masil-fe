import CurrentMessage from './_profileForm/CurrentMessage';
import ProfileImage from './_profileForm/ProfileImage';

export default function ProfilForm() {
  return (
    <>
      <div className="flex flex-col items-center mt-48">
        <div className="w-72 font-sans text-24 text-center">
          프로필 설정하기
        </div>
        <ProfileImage />
        <CurrentMessage />
      </div>
    </>
  );
}
