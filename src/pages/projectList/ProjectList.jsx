import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MagnifyingGlassIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import React, { useEffect, useState } from 'react'
import ProjectCard from '../project/ProjectCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects, searchProjects } from '@/redux/project/Action'

export const tags = ["All", "React", "NextJs", "Spring Boot", "MongoDb"];

const ProjectList = () => {
  //state keyword
  const [keyword, setKeyword] = useState("");
  const { project } = useSelector(store => store);
  const dispatch = useDispatch();
  const handleFilterCategory = (value) => {
    if (value == "all") {
      dispatch(fetchProjects({}));
    } else { //2h22min
      dispatch(fetchProjects({ category: value }))
    }
    console.log("valuecategory = ", value)
  }
  const handleFilterTags = (value) => {
    if (value == "All") {
      dispatch(fetchProjects({}));
    } else { //2h22min
      dispatch(fetchProjects({ tag: value }));
    }
    console.log("valueTag = ", value)
  }
  // const handleFilterChange = (section, value) => { //removed 2h17min
  //   console.log("section = ", section)
  //   console.log("value = ", value)
  // }
  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    dispatch(searchProjects(e.target.value));
  }
  // useEffect(()=>{
  //   dispatch(fetchProjects({}))
  // }, []);
  console.log("project store = ", project);
  return (
    <>
      <div className='relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5'>
        <section className='filterSection'>
          <Card className='p-5 sticky top-10'>
            <div className='flex justify-between lg:w-[20rem]'>
              <p className='text-xl -tracking-wider'>Filters</p>
              <Button className="rounded-full" variant="ghost" size="icon">
                <MixerHorizontalIcon />
              </Button>
            </div>
            <CardContent className="mt-5">
              <ScrollArea className="space-y-7 h-[70vh]">
                <div>
                  <h1 className='pb-3 text-gray-400 border-b'>
                    Category
                  </h1>
                  <div className='pt-5'>
                    <RadioGroup className="space-y-3 pt-1" defaultValue="all" onValueChange={(value) => handleFilterCategory(value)}> {/*changed from handleFilterChange("category", value) 2h18min */}
                      <div className='flex items-center gap-2'>
                        <RadioGroupItem value='all' id="r1" />
                        <Label htmlFor="r1">All</Label>
                      </div>
                      <div className='flex items-center gap-2'>
                        <RadioGroupItem value='fullstack' id="r2" />
                        <Label htmlFor="r1">Full-Stack</Label>
                      </div>
                      <div className='flex items-center gap-2'>
                        <RadioGroupItem value='frontend' id="r3" />
                        <Label htmlFor="r1">Front-End</Label>
                      </div>
                      <div className='flex items-center gap-2'>
                        <RadioGroupItem value='backend' id="r4" />
                        <Label htmlFor="r1">Back-End</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <div className='pt-9'>
                  <h1 className='pb-3 text-gray-400 border-b'>
                    Tag
                  </h1>
                  <div className='pt-5'>
                    <RadioGroup className="space-y-3 pt-1" defaultValue="All" onValueChange={(value) => handleFilterTags(value)}>
                      {tags.map((item) => <div key={item} className='flex items-center gap-2'>
                        <RadioGroupItem value={item} id={`r1-${item}`} />
                        <Label htmlFor={`r1-${item}`}>{item}</Label>
                      </div>)}
                    </RadioGroup>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>
        <section className='projectListSection w-full lg:w-[48rem]'>
          <div className='flex gap-2 items-center pb-5 justify-between'>
            <div className='relative p-0 w-full'>
              <Input placeholder="Search project" className="40% px-9" /*rounded-full*/
                onChange={handleSearchChange} />
              <MagnifyingGlassIcon className='absolute top-3 left-4' />
            </div>
          </div>
          <div>
            <div className='space-y-5 min-h-[74vh]'>
              {
                //{item.id*index} to differenciate and prevent warning Encountered two children with the same key 2h13min
                keyword ? project.searchProjects?.map((item, index) => <ProjectCard key={item.id * index} item={item} />) :
                  // [1,1,1,1,1].map((item)=><ProjectCard key={item}/>) 1h51min commented
                  project.projects?.map((item) => <ProjectCard key={item.id} item={item} />)
              }
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default ProjectList