import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useWarmupCooldownStore = create(
  persist(
    (set, get) => ({
      activities: [],
      isInitialized: false,
      
      initializeActivities: (defaultActivities) => {
        const state = get()
        if (!state.isInitialized && state.activities.length === 0) {
          console.log('Initializing warmup/cooldown activities with defaults')
          set({
            activities: defaultActivities,
            isInitialized: true
          })
        }
      },
      
      addActivity: (activity) => set((state) => ({
        activities: [...state.activities, { 
          ...activity, 
          id: Date.now().toString(), 
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString() 
        }]
      })),
      
      updateActivity: (id, updates) => set((state) => ({
        activities: state.activities.map(activity => 
          activity.id === id 
            ? { ...activity, ...updates, updatedAt: new Date().toISOString() }
            : activity
        )
      })),
      
      deleteActivity: (id) => set((state) => ({
        activities: state.activities.filter(activity => activity.id !== id)
      })),
      
      getActivity: (id) => {
        return get().activities.find(activity => activity.id === id)
      },
      
      searchActivities: (query, type = null) => {
        const lowercaseQuery = query.toLowerCase()
        return get().activities.filter(activity => {
          // Filter by type if specified
          if (type && activity.type !== type && activity.type !== 'both') {
            return false
          }
          
          // Search in title, description, and tags
          const searchableText = [
            activity.title,
            activity.description,
            ...(activity.tags || [])
          ].filter(Boolean).join(' ').toLowerCase()
          
          return searchableText.includes(lowercaseQuery)
        })
      },
      
      getActivitiesByType: (type) => {
        return get().activities.filter(activity => 
          activity.type === type || activity.type === 'both'
        )
      },
      
      importActivities: (importedActivities) => set(() => ({
        activities: importedActivities
      })),
      
      exportActivities: () => {
        return JSON.stringify(get().activities, null, 2)
      }
    }),
    {
      name: 'warmup-cooldown-storage',
    }
  )
)

export default useWarmupCooldownStore