import RedesSociales from "./RedesSociales";

export default function Footer() {
  return (
    <footer
      className="bg-[#262626] py-8 text-white flex 
    flex-col md:flex-row md:px-10 xl:px-36"
    >
      <div
        className="container mx-auto flex flex-col text-center
      justify-center md:grid md:grid-cols-4 gap-10 lg:gap-20 md:text-start"
      >
        <div className="space-y-5">
          <h2 className="text-lg font-bold">Shortly</h2>
        </div>

        <div className="space-y-5">
          <h3 className="text-sm font-bold">Features</h3>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className=" hover:text-gray-300 cursor-pointer hover:decoration-purple-500" >Link Shortening</li>
            <li className=" hover:text-gray-300 cursor-pointer hover:decoration" >Branded Links</li>
            <li className=" hover:text-gray-300 cursor-pointer hover:decoration" >Analytics</li>
          </ul>
        </div>

        <div className="space-y-5">
          <h3 className="text-sm font-bold">Resources</h3>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className=" hover:text-gray-300 cursor-pointer hover:decoration" >Blog</li>
            <li className=" hover:text-gray-300 cursor-pointer hover:decoration" >Developers</li>
            <li className=" hover:text-gray-300 cursor-pointer hover:decoration" >Support</li>
          </ul>
        </div>

        <div className="space-y-5">
          <h3 className="text-sm font-bold">Company</h3>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className=" hover:text-gray-300 cursor-pointer hover:decoration" >About</li>
            <li className=" hover:text-gray-300 cursor-pointer hover:decoration" >Our Team</li>
            <li className=" hover:text-gray-300 cursor-pointer hover:decoration" >Careers</li>
            <li className=" hover:text-gray-300 cursor-pointer hover:decoration" >Contact</li>
          </ul>
        </div>
      </div>
      <RedesSociales />
    </footer>
  );
}
