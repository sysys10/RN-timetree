import { UseMutationCustomOptions } from "@/types/common";
import eventApi from "@/api/eventapi";
import { useMutation } from "@tanstack/react-query";


function useAddEvent(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: eventApi.addEvent,
        ...mutationOptions
    })
}