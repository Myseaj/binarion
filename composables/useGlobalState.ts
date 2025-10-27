import { ref } from 'vue'

interface JobFilter {
  city: string
  position: string
  locations: Array<{ text: string; value: any }>
  locationChosen?: string[]
}

interface Job {
  id: string
  title: string
  company: string
  location: string
  job_type?: string
  description?: string
  salary_min?: number
  salary_max?: number
  locationPath?: string
  iconArray?: Array<{ text: string; icon: string }>
  emojiArray?: Array<{ text: string; icon: string }>
  jobad_benefit_array?: string[]
}

interface JobObject {
  jobs: Job[]
  filter: JobFilter
}

const stateJobObject = ref<JobObject>({
  jobs: [],
  filter: {
    city: '',
    position: '',
    locations: [],
    locationChosen: []
  }
})

const stateJobs = ref<Job[]>([])
const stateFilter = ref<JobFilter>({
  city: '',
  position: '',
  locations: [],
  locationChosen: []
})

export default function useGlobalState() {
  const updateJobs = (jobs: Job[]) => {
    stateJobs.value = jobs
  }

  const updateFilters = (filter: JobFilter) => {
    stateFilter.value = filter
  }

  const updateJobObject = (jobObject: JobObject) => {
    stateJobObject.value = jobObject
  }

  return {
    stateJobObject,
    stateJobs,
    stateFilter,
    updateJobs,
    updateFilters,
    updateJobObject
  }
}
