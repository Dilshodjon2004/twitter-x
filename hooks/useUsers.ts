import fetcher from '@/lib/fetcher'
import useSwr from 'swr'

const useUsers = (limit: number) => {
	const { data, error, isLoading, mutate } = useSwr(
		`/api/users?limit=${limit}`,
		fetcher
	)

	return {
		users: data,
		isLoading,
		error,
		mutate,
	}
}

export default useUsers
