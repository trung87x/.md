// Component nhỏ cho từng thành viên
function TeamMember({ person }) {
  return (
    <li className="flex items-center gap-x-6 py-5">
      <img
        className="h-16 w-16 rounded-full bg-gray-50"
        src={person.imageUrl}
        alt=""
      />
      <div>
        <h3 className="text-base leading-7 font-semibold tracking-tight text-gray-900">
          {person.name}
        </h3>
        <p className="text-sm leading-6 font-semibold text-indigo-600">
          {person.role}
        </p>
      </div>
    </li>
  );
}

export default function About() {
  const team = [
    {
      name: "Leslie Alexander",
      role: "Co-Founder / CEO",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Michael Foster",
      role: "Senior Designer",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Đội ngũ của chúng tôi
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Chúng tôi là những người đam mê công nghệ và thiết kế, luôn nỗ lực
            mang lại giá trị tốt nhất.
          </p>
        </div>
        <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 lg:col-span-2">
          {team.map((person) => (
            <TeamMember key={person.name} person={person} />
          ))}
        </ul>
      </div>
    </div>
  );
}
