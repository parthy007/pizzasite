import SectionHeader from "@/components/layout/SectionHeader";

const About = () => {
  return (
    <section className="my-16 text-center">
      <SectionHeader subHeader={"out story"} mainHeader={"About Us"} />
      <div className="max-w-md text-gray-500 flex flex-col gap-4 mt-4 mx-auto">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae
          dicta a ab laborum aperiam natus facere consequatur numquam sed vitae
          suscipit distinctio fugiat, incidunt esse nisi vel quae reprehenderit
          architecto? Veniam odit, perferendis cum facere, harum, illum possimus
          architecto error unde sed aut recusandae nisi enim officia cumque
          asperiores commodi!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          dolore quia dolor incidunt aut quas dignissimos vel, mollitia optio?
          Possimus impedit nobis quis, reiciendis voluptate qui tenetur
          voluptatibus? Optio, repellat.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          itaque ad qui architecto culpa, nulla doloremque provident nisi quae
          voluptate!
        </p>
      </div>
    </section>
  );
};

export default About;
