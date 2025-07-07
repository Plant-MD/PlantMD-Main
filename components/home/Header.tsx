import Link from "next/link";

const navLinks = [
  { label: "About Us", href: "/about" },
  { label: "Tutorial", href: "/projects" },
  { label: "Contact", href: "/blog" },
];

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-4 max-w-7xl mx-auto">
      {/* Logo / Site Name */}
      <div className="text-xl sm:text-2xl font-bold text-gray-900">Plant MD</div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6 text-lg font-medium">
        {navLinks.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="relative group text-gray-600 transition-colors duration-200 hover:text-green-600"
          >
            <span className="capitalize">{label}</span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-500 transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}

        <Link
          href="/dashboard"
          className="bg-plant-dark hover:bg-gray-800 text-white px-4 lg:px-6 py-2 rounded-md transition-colors"
        >
          Dashboard
        </Link>
      </nav>

      {/* Mobile menu button */}
      <div className="md:hidden p-2 cursor-pointer">
        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
          <div className="w-full h-0.5 bg-gray-900" />
          <div className="w-full h-0.5 bg-gray-900" />
          <div className="w-full h-0.5 bg-gray-900" />
        </div>
      </div>
    </header>
  );
}
